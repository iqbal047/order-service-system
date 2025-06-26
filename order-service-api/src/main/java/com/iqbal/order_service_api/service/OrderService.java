package com.iqbal.order_service_api.service;

import com.iqbal.order_service_api.dto.OrderDTO;
import com.iqbal.order_service_api.dto.OrderItemDTO;
import com.iqbal.order_service_api.exception.ResourceNotFoundException;
import com.iqbal.order_service_api.model.Order;
import com.iqbal.order_service_api.model.OrderItem;
import com.iqbal.order_service_api.model.Product;
import com.iqbal.order_service_api.repository.OrderRepository;
import com.iqbal.order_service_api.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setCustomerName(orderDTO.getCustomerName());
        order.setCustomerEmail(orderDTO.getCustomerEmail());
        order.setOrderDate(LocalDate.now());
        order.setStatus(orderDTO.getStatus());

        List<OrderItem> orderItems = orderDTO.getItems().stream()
                .map(itemDTO -> {
                    Product product = productRepository.findById(itemDTO.getProductId())
                            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemDTO.getProductId()));

                    if (product.getStock() < itemDTO.getQuantity()) {
                        throw new IllegalStateException("Insufficient stock for product: " + product.getName());
                    }

                    product.setStock(product.getStock() - itemDTO.getQuantity());
                    productRepository.save(product);

                    OrderItem item = new OrderItem();
                    item.setProduct(product);
                    item.setQuantity(itemDTO.getQuantity());
                    item.setPrice(product.getPrice());
                    return item;
                })
                .collect(Collectors.toList());

        order.setItems(orderItems);
        order.setTotalPrice(calculateTotalPrice(orderItems));

        Order savedOrder = orderRepository.save(order);
        return mapToDTO(savedOrder);
    }

    public OrderDTO getOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return mapToDTO(order);
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

@Transactional
public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
    Order order = orderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

    order.setCustomerName(orderDTO.getCustomerName());
    order.setCustomerEmail(orderDTO.getCustomerEmail());
    order.setStatus(orderDTO.getStatus());

    List<OrderItem> updatedItems = orderDTO.getItems().stream()
            .map(itemDTO -> {
                Product product = productRepository.findById(itemDTO.getProductId())
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemDTO.getProductId()));

                if (product.getStock() < itemDTO.getQuantity()) {
                    throw new IllegalStateException("Insufficient stock for product: " + product.getName());
                }

                product.setStock(product.getStock() - itemDTO.getQuantity());
                productRepository.save(product);

                OrderItem item = new OrderItem();
                item.setProduct(product);
                item.setQuantity(itemDTO.getQuantity());
                item.setPrice(product.getPrice());
                // item.setOrder(order); ← REMOVE this line
                return item;
            })
            .collect(Collectors.toList());

    order.getItems().clear();
    order.getItems().addAll(updatedItems);

    order.setTotalPrice(
            updatedItems.stream()
                    .mapToDouble(i -> i.getPrice() * i.getQuantity())
                    .sum()
    );

    Order updatedOrder = orderRepository.save(order);
    return mapToDTO(updatedOrder);
}




    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));

        order.getItems().forEach(item -> {
            Product product = item.getProduct();
            product.setStock(product.getStock() + item.getQuantity());
            productRepository.save(product);
        });
        orderRepository.delete(order);
    }

    private Double calculateTotalPrice(List<OrderItem> items) {
        return items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    private OrderDTO mapToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setStatus(order.getStatus());

        List<OrderItemDTO> itemDTOs = order.getItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = new OrderItemDTO();
                    itemDTO.setId(item.getId());
                    itemDTO.setProductId(item.getProduct().getId());
                    itemDTO.setProductName(item.getProduct().getName());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    return itemDTO;
                })
                .collect(Collectors.toList());

        dto.setItems(itemDTOs);
        return dto;
    }
}
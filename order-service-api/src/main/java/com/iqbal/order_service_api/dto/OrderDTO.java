package com.iqbal.order_service_api.dto;

import java.time.LocalDate;
import java.util.List;

public class OrderDTO {
    private Long id;
    private String customerName;
    private String customerEmail;
    private LocalDate orderDate;
    private List<OrderItemDTO> items;
    private Double totalPrice;
    private String status;


    public OrderDTO() {
    }


    public OrderDTO(Long id, String customerName, String customerEmail, LocalDate orderDate,
                    List<OrderItemDTO> items, Double totalPrice, String status) {
        this.id = id;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.orderDate = orderDate;
        this.items = items;
        this.totalPrice = totalPrice;
        this.status = status;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
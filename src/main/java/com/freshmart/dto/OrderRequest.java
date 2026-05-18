package com.freshmart.dto;

import java.util.List;

public class OrderRequest {
    private String customerEmail;
    private List<OrderItemRequest> items;
    private Double totalAmount;
    private String paymentMethod; // COD or CARD
    private String cardBank;      // bank name if CARD, else null

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getCardBank() { return cardBank; }
    public void setCardBank(String cardBank) { this.cardBank = cardBank; }
}

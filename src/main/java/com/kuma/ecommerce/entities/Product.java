package com.kuma.ecommerce.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name,description;
    private double currentPrice;
    private boolean promotion,available,selected;
    private String photoName;
    @Transient
    private int quantity=1; 
    @ManyToOne
    private Category category;
}

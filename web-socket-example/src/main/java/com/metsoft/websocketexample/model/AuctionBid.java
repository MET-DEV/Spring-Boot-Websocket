package com.metsoft.websocketexample.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuctionBid implements Serializable {
    private String userName;
    private double price;
    private String name;
}

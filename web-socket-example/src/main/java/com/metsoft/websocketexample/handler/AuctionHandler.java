package com.metsoft.websocketexample.handler;

import com.metsoft.websocketexample.model.AuctionBid;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class AuctionHandler {
    @MessageMapping("/bid")
    @SendTo("/topic/auction")
    public AuctionBid send(@Payload AuctionBid bid) {
        return bid;
    }
}

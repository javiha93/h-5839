package org.example.aplication.hapier;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.domain.mapper.MapLineInfo;
import org.example.domain.mapper.MapperInfo;
import org.example.domain.hl7message.HL7Message;
import org.example.domain.hl7message.Segment;
import org.example.domain.hl7message.list.OrderSegmentList;
import org.example.domain.message.Message;
import org.example.domain.message.entity.Order;
import org.example.domain.message.entity.list.OrderList;

import java.util.ArrayList;
import java.util.List;

public class HL7MessageToMessageMapper {

    ObjectMapper objectMapper;

    public HL7MessageToMessageMapper() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    public Message map(HL7Message hl7Message, MapperInfo mapperInfo) {

        List<OrderSegmentList> orderSegmentList = hl7Message.getOrderSegmentList();
        List<Segment> notOrderSegmentList = hl7Message.getNotOrderSegments();

        List<Order> orderMessages = getOrderMessages(orderSegmentList, mapperInfo);
        Message message = getMessageBySegments(notOrderSegmentList, mapperInfo);

        OrderList orderList = new OrderList();
        for (Order order : orderMessages) {
            orderList.mergeOrder(order);
        }
        message.getPatient().setOrders(orderList);
        return message;
    }

    public List<Order> getOrderMessages(List<OrderSegmentList> orderSegmentList, MapperInfo mapperInfo) {
        List<Order> orders = new ArrayList<>();
        for (OrderSegmentList orderSegment : orderSegmentList) {
            orders.add(getOrderBySegments(orderSegment.getSegments(), mapperInfo));
        }
        return orders;
    }

    public Order getOrderBySegments(List<Segment> segments, MapperInfo mapperInfo) {
        Order order = new Order();
        for (Segment segment : segments) {
            mapperInfo.addOptionalLines(segment);
            mapperInfo.addNonSpecificLines(segment);
            for (MapLineInfo mapLineInfo : mapperInfo.getOrderMaps()) {
                if (mapLineInfo.getHl7Position().getSegmentType().equals(segment.getType()) && (mapLineInfo.getHardCodedValue() == null)) {
                    String value = segment.getFieldValue(mapLineInfo.getHl7Position().getPositions());
                    order.setFieldValue(mapLineInfo.getMessagePosition(), value);
                    //order.set(mapLineInfo.getFullMessagePosition(), value);
                }
            }
        }
        return order;
    }

    public Message getMessageBySegments(List<Segment> segments, MapperInfo mapperInfo) {
        Message message = new Message();
        for (Segment segment : segments) {
            for (MapLineInfo mapLineInfo : mapperInfo.getNotOrderMaps()) {
                if (mapLineInfo.getHl7Position().getSegmentType().equals(segment.getType())) {
                    message.setFieldValue(mapLineInfo.getMessagePosition(), segment.getFieldValue(mapLineInfo.getHl7Position().getPositions()));
                }
            }
        }
        return message;
    }
}

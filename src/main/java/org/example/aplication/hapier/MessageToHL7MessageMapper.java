package org.example.aplication.hapier;

import org.example.domain.mapper.MapLineInfo;
import org.example.domain.mapper.MapperInfo;
import org.example.domain.hl7message.ESegmentType;
import org.example.domain.hl7message.Field;
import org.example.domain.hl7message.HL7Message;
import org.example.domain.hl7message.Segment;
import org.example.domain.hl7message.list.SegmentsList;
import org.example.domain.message.Message;
import org.example.domain.message.entity.Order;
import org.example.domain.message.entity.Slide;
import org.example.domain.message.entity.list.SupplementalInfoList;

import java.util.ArrayList;
import java.util.List;

public class MessageToHL7MessageMapper {

    public HL7Message map(Message message, MapperInfo mapperInfo) {

        setMapperMessageType(message, mapperInfo);
        List<Order> orders = getOrdersForEverySlide(message);

        List<Segment> segments = getNotOrderSegmentsLists(message, mapperInfo);
        addOrderSegmentLists(orders, mapperInfo, segments);
        removeEmptySegments(segments);

        SegmentsList segmentsList = SegmentsList.of(segments);
        return new HL7Message(segmentsList);
    }

    public List<Order> getOrdersForEverySlide(Message message) {
        List<Slide> slides = message.getAllSlides();
        List<Order> orders = new ArrayList<>();
        for (Slide slide : slides) {
            Order order = slide.getOrderSlide(message);
            orders.add(order.clone());
        }
        return orders;
    }

    public void addOrderSegmentLists(List<Order> orders, MapperInfo mapperInfo, List<Segment> segments) {
        List<Segment> segmentsToReturn = new ArrayList<>();
        boolean hasSupplementalInfo = false;
        for (Order order : orders) {
            List<Segment> segmentsList = getSegmentsForOrder(mapperInfo);
            for (MapLineInfo mapLineInfo : mapperInfo.getOrderMaps()) {
                if (mapLineInfo.isMapping("supplementalInfos")) {
                    hasSupplementalInfo = true;
                    continue;
                }
                for (Segment orderSegment : segmentsList) {
                    if (mapLineInfo.getHardCodedValue() != null) {
                        orderSegment.addField(mapLineInfo.getHl7Position(), mapLineInfo.getHardCodedValue());
                    } else {
                        String x = (String) order.get(mapLineInfo.getFullMessagePosition());
                        //String x = (String) order.getFieldValue(mapLineInfo.getMessagePosition());
                        orderSegment.addField(mapLineInfo.getHl7Position(), x);
                        //x = (String) order.get(mapLineInfo.getFullMessagePosition());
                    }
                }
            }

            if (hasSupplementalInfo) {
                addSupplemental(segmentsList, order.getAllSlides().get(0));
            }
            segmentsToReturn.addAll(segmentsList);

            for (MapperInfo optionalMapperInfo : mapperInfo.getOptionalMapperInfos(order)) {
                segmentsList = getSegmentsForOrder(optionalMapperInfo);
                for (MapLineInfo mapLineInfo : optionalMapperInfo.getOrderMaps()) {
                    for (Segment orderSegment : segmentsList) {
                        if (mapLineInfo.getHardCodedValue() != null) {
                            orderSegment.addField(mapLineInfo.getHl7Position(), mapLineInfo.getHardCodedValue());
                        } else {
                            String x = (String) order.get(mapLineInfo.getFullMessagePosition());
                            //String x = (String) order.getFieldValue(mapLineInfo.getMessagePosition());
                            orderSegment.addField(mapLineInfo.getHl7Position(), x);
                        }
                    }
                }
                segmentsToReturn.addAll(segmentsList);
            }
        }
        segments.addAll(segmentsToReturn);
    }

    public List<Segment> getSegmentsForOrder(MapperInfo mapperInfo) {
        List<Segment> segmentsList = new ArrayList<>();

        List<ESegmentType> segmentTypes = mapperInfo.getOrderSegmentTypes();
        for (ESegmentType segmentType : segmentTypes) {
            segmentsList.add(Segment.of(segmentType));
        }
        return segmentsList;
    }

    public List<Segment> getNotOrderSegmentsLists(Message message, MapperInfo mapperInfo) {
        List<Segment> segmentsList = getSegmentsForNotOrder(mapperInfo);
        for (MapLineInfo mapLineInfo : mapperInfo.getNotOrderMaps()) {
            for (Segment orderSegment : segmentsList) {
                String x = (String) message.get(mapLineInfo.getFullMessagePosition());
                //String x = (String) message.getFieldValue(mapLineInfo.getMessagePosition());
                orderSegment.addField(mapLineInfo.getHl7Position(), x);
            }
        }
        return segmentsList;
    }

    public List<Segment> getSegmentsForNotOrder(MapperInfo mapperInfo) {
        List<ESegmentType> segmentTypes = mapperInfo.getNotOrderSegmentTypes();
        List<Segment> segmentsList = new ArrayList<>();
        for (ESegmentType segmentType : segmentTypes) {
            segmentsList.add(Segment.of(segmentType));
        }
        return segmentsList;
    }

    public void removeEmptySegments(List<Segment> segments) {
        List<Segment> segmentsToRemove = new ArrayList<>();
        for (Segment segment : segments) {
            if (segment.isSegmentEmpty()) {
                segmentsToRemove.add(segment);
            }
        }
        segments.removeAll(segmentsToRemove);
    }

    public void addSupplemental(List<Segment> segments, Slide slide) {
        if (slide.getSupplementalInfos() == null || slide.getSupplementalInfos().getSupplementalInfoList().isEmpty()) {
            return;
        }
        SupplementalInfoList supplementalInfoList = slide.getSupplementalInfos();
        for (Segment segment : segments) {
            if (segment.getType().equals(ESegmentType.OBR)) {
                Field field = supplementalInfoList.supplementalToField();
                segment.addField(field);
            }
        }
    }

    public void setMapperMessageType(Message message, MapperInfo mapperInfo) {
       message.getHeader().setMessageType(mapperInfo.getMessageType().getType());
       message.getOrder().setActionCode(mapperInfo.getMessageType().getActionCode());
       message.setActionCode(mapperInfo.getMessageType().getActionCode());
       message.getOrder().setStatus(mapperInfo.getMessageType().getStatus());
    }
}

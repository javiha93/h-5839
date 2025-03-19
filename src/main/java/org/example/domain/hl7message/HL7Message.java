package org.example.domain.hl7message;

import lombok.Data;
import org.example.domain.hl7message.list.OrderSegmentList;
import org.example.domain.hl7message.list.SegmentsList;
import org.example.domain.message.entity.Slide;

import java.util.ArrayList;
import java.util.List;

@Data
public class HL7Message {
    private SegmentsList segments;

    public HL7Message(SegmentsList segments) {
        this.segments = segments;
    }

    public List<Segment> getAllSegment() {
        return segments.getSegments();
    }


    public List<Segment> getSegments(ESegmentType segmentType) {
        List<Segment> segmentList = segments.getSegments();
        List<Segment> segmentsToReturn = new ArrayList<>();
        for (Segment segment : segmentList) {
            if (segment.getType().equals(segmentType)) {
               segmentsToReturn.add(segment);
            }
        }
        return segmentsToReturn;
    }

    public OrderSegmentList getOrderSegments(Segment segment) {
        List<Segment> segmentList = segments.getSegments();
        OrderSegmentList orderSegments = new OrderSegmentList();
        orderSegments.setObrSegment(segment);

        int segmentIndex = segmentList.indexOf(segment);
        if (segmentIndex - 1 < 0) {
            return orderSegments;
        }
        Segment beforeSegment = segmentList.get(segmentIndex - 1);
        if (beforeSegment.getType().equals(ESegmentType.ORC)) {
            orderSegments.setOrcSegment(beforeSegment);

            if (segmentIndex + 1 > segmentList.size() - 1) {
                return orderSegments;
            }
            while (segmentIndex < segmentList.size() - 1) {
                segmentIndex = segmentIndex + 1;
                Segment followingSegment = segmentList.get(segmentIndex);
                if (followingSegment.getType().equals(ESegmentType.OBX)) {
                    orderSegments.addObxSegment(followingSegment);
                } else {
                    break;
                }
            }
        }

        return orderSegments;
    }

    public List<OrderSegmentList> getOrderSegmentList() {
        List<Segment> segmentList = getSegments(ESegmentType.OBR);
        List<OrderSegmentList> orderSegmentList = new ArrayList<>();
        for (Segment obrSegment : segmentList) {
            OrderSegmentList orderSegment = getOrderSegments(obrSegment);
            orderSegmentList.add(orderSegment);
        }
        return orderSegmentList;
    }

    public List<Segment> getNotOrderSegments() {
        List<Segment> segmentList = segments.getSegments();
        List<Segment> segmentsToReturn = new ArrayList<>();
        for (Segment segment : segmentList) {
            if (!((segment.getType().equals(ESegmentType.OBR)) || (segment.getType().equals(ESegmentType.ORC)) || (segment.getType().equals(ESegmentType.OBX)))) {
                segmentsToReturn.add(segment);
            }
        }
        return segmentsToReturn;
    }





}

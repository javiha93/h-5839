package org.example.domain.hl7message.list;

import lombok.Data;
import org.example.domain.hl7message.Segment;

import java.util.ArrayList;
import java.util.List;

@Data
public class SegmentsList {
    private List<Segment> segments;

    private SegmentsList(List<Segment> segments) {
        this.segments = segments;
    }

    public static SegmentsList of(List<Segment> segments) {
        return new SegmentsList(segments);
    }

    public void addOrderSegments(List<OrderSegmentList> orderSegmentLists) {
        for (OrderSegmentList orderSegmentList : orderSegmentLists) {
            addOrderSegments(orderSegmentList);
        }
    }

    public void addOrderSegments(OrderSegmentList orderSegmentList) {
        segments.add(orderSegmentList.getOrcSegment());
        segments.add(orderSegmentList.getObrSegment());
        segments.addAll(orderSegmentList.getObxSegments());
    }

    public void addSegments(List<Segment> segments) {
        for (Segment segment : segments) {
            segments.add(segment);
        }
    }
}

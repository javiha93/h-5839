package org.example.domain.hl7message.list;

import lombok.Data;
import org.example.domain.hl7message.ESegmentType;
import org.example.domain.hl7message.Segment;

import java.util.ArrayList;
import java.util.List;

@Data
public class OrderSegmentList {
    private Segment obrSegment;
    private Segment orcSegment;
    private List<Segment> obxSegments;

    public List<Segment> getSegments() {
        List<Segment> segmentList = new ArrayList<>();
        if (obrSegment != null) {
            segmentList.add(obrSegment);
        }
        if (orcSegment != null) {
            segmentList.add(orcSegment);
        }
        if (obxSegments != null) {
            segmentList.addAll(obxSegments);
        }

        return segmentList;
    }

    public void addObxSegment(Segment obxSegment) {
        if (obxSegments == null) {
            setObxSegments(new ArrayList<>());
        }
        obxSegments.add(obxSegment);
    }
}

package org.example.domain.hl7.VTG.VTGToNPLH.OEWF;

import org.example.domain.hl7.HL7Segment;

import java.util.ArrayList;
import java.util.List;

public class OEWF extends HL7Segment {
    MSH msh;
    PID pid;
    PV1 pv1;
    List<OSegment> oSegments = new ArrayList<>();

    public static OEWF OneSlide(String sampleId) {
        OEWF oml21 = new OEWF();

        oml21.msh = MSH.Default();
        oml21.pid = PID.Default();
        oml21.pv1 = PV1.Default();

        oml21.oSegments.add(new OSegment(ORC.Default(sampleId),
                OBR.Default(sampleId, "A", "1", "1", "1"),
                OBX.Default(sampleId, "A", "1", "1", "1")));
        return oml21;
    }

    @Override
    public String toString() {
        String oml21 = nullSafe(msh) + "\n" +
                nullSafe(pid) + "\n" +
                nullSafe(pv1) + "\n";

        String oSegmentsString = "";
        for (OSegment oSegment : oSegments) {
            oSegmentsString = oSegmentsString + nullSafe(oSegment.orc.toString()) + "\n" +
                    nullSafe(oSegment.obr.toString()) + "\n" +
                    nullSafe(oSegment.obx.toString()) + "\n";
        }
        return cleanMessage(oml21 + oSegmentsString);
    }
}

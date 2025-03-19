package org.example.domain.hl7.LIS.LISToNPLH.DELETESLIDE;

import org.example.domain.hl7.HL7Segment;

public class DELETESLIDE extends HL7Segment {
    MSH msh;
    PID pid;
    OBR obr;
    ORC orc;

    public static DELETESLIDE Default(String sampleId, String slideId) {
        DELETESLIDE deleteSlide = new DELETESLIDE();

        deleteSlide.msh = MSH.Default();
        deleteSlide.pid = PID.Default();
        deleteSlide.orc = ORC.Default(sampleId, slideId);
        deleteSlide.obr = OBR.Default(slideId);

        return deleteSlide;
    }

    @Override
    public String toString() {
        String deleteSlide = nullSafe(msh) + "\n" +
                nullSafe(pid) + "\n" +
                nullSafe(orc) + "\n" +
                nullSafe(obr) + "\n";

        return cleanMessage(deleteSlide);
    }
}

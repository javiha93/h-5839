package org.example.domain.hl7.LIS.LISToNPLH.DELETESPECIMEN;

import org.example.domain.hl7.HL7Segment;

public class DELETESPECIMEN extends HL7Segment {
    MSH msh;
    PID pid;
    OBR obr;
    ORC orc;

    public static DELETESPECIMEN Default(String sampleId, String specimenId) {
        DELETESPECIMEN deleteSpecimen = new DELETESPECIMEN();

        deleteSpecimen.msh = MSH.Default();
        deleteSpecimen.pid = PID.Default();
        deleteSpecimen.orc = ORC.Default(sampleId, specimenId);
        deleteSpecimen.obr = OBR.Default(specimenId);

        return deleteSpecimen;
    }

    @Override
    public String toString() {
        String deleteSpecimen = nullSafe(msh) + "\n" +
                nullSafe(pid) + "\n" +
                nullSafe(orc) + "\n" +
                nullSafe(obr) + "\n";

        return cleanMessage(deleteSpecimen);
    }
}

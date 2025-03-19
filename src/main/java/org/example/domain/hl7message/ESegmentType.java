package org.example.domain.hl7message;

public enum ESegmentType {
    MSH("header"),
    PID("patient"),
    PV1("physician"),
    MSA(null),
    ERR(null),
    SAC(null),
    ORC(null),
    OBR(null),
    OBX(null);

    private final String structure;

    ESegmentType(String structure) {
        this.structure = structure;
    }

    public String getStructure() {
        return structure;
    }
}

package org.example.domain.hl7.VTG.VTGToNPLH.OEWF;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

@Data
@NoArgsConstructor
public class OBX extends org.example.domain.hl7.common.OBX {

    public static OBX Default(String sampleId, String specimenId, String blockId, String slideId, String segmentNumber) {
        return (OBX) org.example.domain.hl7.common.OBX.Default(sampleId, specimenId, blockId, slideId, segmentNumber);
    }

}

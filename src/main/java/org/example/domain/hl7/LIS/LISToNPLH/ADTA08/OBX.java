package org.example.domain.hl7.LIS.LISToNPLH.ADTA08;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.hl7.HL7Position;
import org.example.domain.hl7.HL7Segment;

@Data
@NoArgsConstructor
public class OBX extends HL7Segment {

    @HL7Position(position = 5)
    private String sampleId;

    public static OBX Default(String sampleId) {
        OBX obx = new OBX();

        obx.sampleId = sampleId;

        return obx;
    }

    @Override
    public String toString() {
        String value = "OBX|||||" +
                nullSafe(sampleId) + "|";  // 5

        return cleanSegment(value);
    }
}

package org.example.domain.hl7.VTG.VTGToNPLH.OEWF;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ORC extends org.example.domain.hl7.common.ORC {

    public static ORC Default(String sampleID) {
        ORC orc = (ORC) org.example.domain.hl7.common.ORC.Default(sampleID);

        orc.setActionCode("SN");

        return orc;
    }

}

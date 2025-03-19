package org.example.domain.ws.VTGWS.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.message.Message;

@Data
@NoArgsConstructor
public class Specimen {

    private String barcode;
    private String fixativeTime;
    private String fixativeType;
    private String sequence;
    private String surgicalProcedureDescription;
    private String surgicalProcedureName;
    private String techConsultId;
    private String tissueDescription;
    private String tissueDimensionHeight;
    private String tissueDimensionLength;
    private String tissueDimensionWeight;
    private String tissueDimensionWidth;
    private String tissueName;
    private String facilityCode;
    private String facilityName;
    private String observationDateTime;

    public static Specimen Default(org.example.domain.message.entity.Specimen entitySpecimen) {
        Specimen specimen = new Specimen();

        specimen.barcode = entitySpecimen.getId();
        specimen.sequence = entitySpecimen.getSequence();
        specimen.surgicalProcedureDescription = entitySpecimen.getProcedure().getSurgical().getDescription();
        specimen.surgicalProcedureName = entitySpecimen.getProcedure().getSurgical().getName();
        specimen.techConsultId = entitySpecimen.getExternalId();
        specimen.tissueDescription = entitySpecimen.getProcedure().getTissue().getDescription();
        specimen.tissueName = entitySpecimen.getProcedure().getTissue().getType();
        specimen.facilityCode = entitySpecimen.getFacilityCode();
        specimen.facilityName = entitySpecimen.getFacilityName();
        specimen.observationDateTime = entitySpecimen.getCollectDateTime();

        return specimen;
    }
}

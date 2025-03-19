package org.example.domain.message.entity;

import lombok.Data;
import org.example.domain.hl7message.Field;
import org.example.domain.hl7message.list.FieldsList;
import org.example.domain.message.Reflection;

import java.util.List;

@Data
public class SupplementalInfo extends Reflection implements Cloneable {
    private String type;
    private String value;
    private String artifact;
    private String qualityIssueType;
    private String qualityIssueValue;

    @Override
    public SupplementalInfo clone() {
        try {
            return (SupplementalInfo) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Cloning not supported for Technician", e);
        }
    }

    public FieldsList supplementalToField() {
        Field type = Field.of(1, getType());
        Field value = Field.of(2, getValue());
        Field artifact = Field.of(3, getArtifact());
        Field qualityIssueType = Field.of(4, getQualityIssueType());
        Field qualityIssueValue = Field.of(5, getQualityIssueValue());

        List<Field> fields = List.of(type, value, artifact, qualityIssueType, qualityIssueValue);
        return FieldsList.of(fields);
    }
}

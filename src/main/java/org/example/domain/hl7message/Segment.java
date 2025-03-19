package org.example.domain.hl7message;

import lombok.Data;
import org.example.domain.mapper.HL7Position;
import org.example.domain.hl7message.list.FieldsList;

import java.util.ArrayList;
import java.util.List;

@Data
public class Segment {
    private ESegmentType type;
    private FieldsList fields;

    private Segment(ESegmentType type, FieldsList fields) {
        this.type = type;
        this.fields = fields;
    }

    public static Segment of(ESegmentType type, FieldsList fields) {
        return new Segment(type, fields);
    }

    public static Segment of(ESegmentType type) {
        return new Segment(type, null);
    }

    public List<Field> getAllFields() {
        return fields.getFields();
    }

    public boolean isSegmentEmpty(){
        return  ((fields == null) || (fields.getFields() == null) || (fields.isEmpty()));
    }


    public String getFieldValue(List<Integer> positions) {
        if (positions == null || positions.isEmpty()) {
            throw new IllegalArgumentException("At least one position must be provided");
        }

        Field field = getFields().getField(positions);
        if (field != null) {
            return field.getValue();
        }
        return null;
    }

    public void addField(HL7Position hl7Position, String value) {
        if (type.equals(hl7Position.getSegmentType())) {
            if (fields == null) {
                List<Field> fieldList = new ArrayList<>();
                setFields(FieldsList.of(fieldList));
            }
            fields.addField(hl7Position.getPositions(), value);
        }
    }

    public void addField(Field field) {
        fields.getFields().add(field);
    }

    public boolean contains(String value) {
        return fields.contains(value);
    }

}

package org.example.domain.hl7message.list;

import lombok.Data;
import org.example.domain.hl7message.Field;

import java.util.ArrayList;
import java.util.List;

@Data
public class FieldsList {
    private List<Field> fields;

    private FieldsList(List<Field> fields) {
        this.fields = fields;
    }

    public static FieldsList of(List<Field> fields) {
        return new FieldsList(fields);
    }

    public boolean isEmpty() {
        boolean isEmpty = true;
        if ((fields == null) || (fields.isEmpty())) {
            return true;
        }
        for (Field field : fields) {
            if (field != null &&
               (field.getValue() != null ||
               (field.getFields() != null && !field.getFields().isEmpty()))) {
                isEmpty = false;
            }
        }
        return isEmpty;
    }



    public void addField(int position, String value) {
        Field field = getFieldByPosition(position);
        if (field == null) {
            fields.add(Field.of(position, value));
        }
    }

    private Field getFieldByPosition(int position) {
        for (Field field : this.fields) {
            if (field.getPosition() == position) {
                return field;
            }
        }
        return null;
    }

    public void addField(List<Integer> positions, String value) {
        if (isLastPosition(positions)) {
            addField(positions.get(0), value);
        } else {
            addFieldParent(positions, value);
        }
    }

    public void addFieldParent(List<Integer> positions, String value) {
        int firstPosition = positions.get(0);
        List<Integer> remainingPositions = positions.subList(1, positions.size());

        Field field = getFieldByPosition(firstPosition);

        if (field == null) {
            field = Field.of(firstPosition, null);
            if (field.getFields() == null) {
                field.setFields(FieldsList.of(new ArrayList<>()));
            }
            field.getFields().addField(remainingPositions, value);
            fields.add(field);
        } else {
            field.getFields().addField(remainingPositions, value);
        }
    }

    private boolean isLastPosition(List<Integer> positions) {
        return (positions.size() == 1);
    }

    public Field getField(List<Integer> positions) {
        Field field = getField(positions.get(0));
        if (field == null) {
            return null;
        }

        if (isLastPosition(positions)) {
            return field;
        } else {
            if (field.getFields() == null) {
                return field;
            }
            return field.getFields().getField(positions.subList(1, positions.size()));
        }
    }

    public Field getField(int position) {
        if (fields.isEmpty()) {
            return null;
        }
        for (Field field : fields) {
            if ((field != null) && (field.getPosition() == position)) {
                return field;
            }
        }
        return null;
    }

    public boolean contains(String value) {
        if (fields.isEmpty()) {
            return false;
        } else {
            boolean contains = false;
            for (Field field : fields) {
                if (field != null && field.contains(value)) {
                    contains = true;
                }
            }
            return contains;
        }
    }
}




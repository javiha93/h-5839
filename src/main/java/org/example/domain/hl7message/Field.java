package org.example.domain.hl7message;

import lombok.Data;
import org.example.domain.hl7message.list.FieldsList;

import java.util.ArrayList;
import java.util.List;

@Data
public class Field {
    private int position;
    private String value;
    private FieldsList fields;

    private Field(int position, String value, FieldsList fields) {
        this.position = position;
        this.value = value;
        this.fields = fields;
    }

    public static Field of(int position, String value) {
        return new Field(position, value, null);
    }

    public static Field of(int position, String value, FieldsList fields) {
        return new Field(position, value, fields);
    }

    public static Field of(int position, FieldsList fields, String separator) {
        List<Field> subFields = fields.getFields();
        String value = null;
        StringBuilder sb = null;
        for (Field subField : subFields) {
            if ((separator != null) && (subField.getValue() != null)) {
                sb.append(separator).append(subField.getValue());
            }
        }
        if ((sb != null) && (!sb.isEmpty())) {
            value = sb.toString();
        }
        return new Field(position, value, fields);
    }

    public boolean areSameField(Field compareField) {
        if (!areSameValue(compareField)) {
            return false;
        }

        if (isChildFieldsEmpty() && compareField.isChildFieldsEmpty()) {
            return true;
        }

        if ((compareField.isChildFieldsEmpty() && !isChildFieldsEmpty()) || (!compareField.isChildFieldsEmpty() && isChildFieldsEmpty())) {
            return false;
        }

        boolean areSameField = true;
        for (Field field : fields.getFields()) {
            boolean areSameChildField = false;
            for (Field compareChildField : compareField.getFields().getFields()) {
                if (field.areSameField(compareChildField)) {
                    areSameChildField = true;
                }
            }
            if (!areSameChildField) {
                areSameField = false;
            }
        }
        return areSameField;
    }

    public boolean areSameValue(Field compareField) {
        boolean areSameValue = true;
        if ((value == null) && (compareField.value == null)) {
            return areSameValue;
        }

        if ((!(value == null) && (compareField.value == null)) || ((value == null) && !(compareField.value == null))) {
            return false;
        }
        if (!value.equals(compareField.value)) {
            areSameValue = false;
        }
        return areSameValue;
    }

    public boolean isChildFieldsEmpty() {
        return ((getFields() == null) || (getFields().isEmpty()));
    }

    public boolean contains(String value) {
        if (this.value.equals(value)) {
            return true;
        }
        if ((getFields() == null) || (getFields().isEmpty())) {
            return false;
        } else {
            return getFields().contains(value);
        }
    }
}

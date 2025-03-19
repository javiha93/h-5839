package org.example.domain.mapper;

import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class MessagePosition {
    MessagePosition childMessagePosition;
    String value;

    public MessagePosition(MessagePosition messagePosition, String value) {
        this.childMessagePosition = messagePosition;
        this.value = value;
    }

    public static MessagePosition of(String jsonPosition) {

        List<String> fields = new ArrayList<>(Arrays.asList(jsonPosition.split("\\.")));
        String value = fields.get(0);
        MessagePosition childMessagePosition = null;
        if (fields.size() != 1) {
            fields.remove(0);
            childMessagePosition = MessagePosition.of(String.join(".", fields));
        }

        return new MessagePosition(childMessagePosition, value);
    }
    public boolean isLastPosition() {
        return (childMessagePosition == null);
    }

    public String getFinalPosition() {
        if (childMessagePosition == null) {
            return value;
        }
        return childMessagePosition.getFinalPosition();
    }

    public String getFullMessagePosition() {
        if (this.childMessagePosition == null) {
            return value;
        }
        return value + "." + childMessagePosition.getFullMessagePosition();
    }

    public boolean isList() {
        return value.contains("List");
    }

    public boolean isMapping(String value) {
        if (this.value.equals(value)) {
            return true;
        }
        if (childMessagePosition == null) {
            return false;
        }
        return childMessagePosition.isMapping(value);
    }
}

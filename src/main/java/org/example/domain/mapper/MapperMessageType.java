package org.example.domain.mapper;

import lombok.Data;

@Data
public class MapperMessageType {
    String type;
    String actionCode;
    String status;

    private MapperMessageType(String type, String actionCode, String status) {
        this.type = type;
        this.actionCode = actionCode;
        this.status = status;
    }

    public static MapperMessageType of(String[] line) {
        if (line.length == 2) {
            return new MapperMessageType(line[1], null, null);
        } else if (line.length == 3) {
           return new MapperMessageType(line[1], line[2], null);
        } else if (line.length == 4) {
            return new MapperMessageType(line[1], line[2], line[3]);
        } else {
            throw new RuntimeException("Invalid line");
        }

    }
}

package org.example.domain;

import java.lang.reflect.Field;
import java.util.List;

public class Contains {

    public boolean containsValue(String value) {
        try {
            return containsValueRecursive(this, value);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            return false;
        }
    }

    private boolean containsValueRecursive(Object obj, String value) throws IllegalAccessException {
        if (obj == null) {
            return false;
        }

        for (Field field : obj.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            Object fieldValue = field.get(obj);

            if (fieldValue != null) {
                if (fieldValue instanceof String) {
                    if (value.equals(fieldValue)) {
                        return true;
                    }
                } else if (fieldValue instanceof Contains) {
                    if (((Contains) fieldValue).containsValue(value)) {
                        return true;
                    }
                } else if (fieldValue instanceof List<?>) {
                    for (Object item : (List<?>) fieldValue) {
                        if (item instanceof Contains) {
                            if (((Contains) item).containsValue(value)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

}

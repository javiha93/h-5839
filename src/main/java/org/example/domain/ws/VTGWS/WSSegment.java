
package org.example.domain.ws.VTGWS;

import org.example.domain.hl7.HL7Segment;

public class WSSegment {

    protected String nullSafe(String value) {
        return value == null ? "" : value;
    }

    protected String nullSafe(WSSegment segment) {
        return segment == null ? "" : segment.toString();
    }

    protected String addIndentation(int indentationLevel) {
        StringBuilder indentation = new StringBuilder();
        for (int i = 0; i < indentationLevel; i++) {
            indentation.append("     ");
        }
        return indentation.toString();
    }
}

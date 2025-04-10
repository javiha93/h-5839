package org.example.domain.ws.VTGWS.VTGWSToNPLH;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.domain.message.Message;
import org.example.domain.ws.VTGWS.WSSegment;
import org.example.domain.ws.VTGWS.common.Block;
import org.example.domain.ws.VTGWS.common.Slide;
import org.example.domain.ws.VTGWS.common.Specimen;
import org.example.domain.ws.VTGWS.common.Technician;

@Data
@NoArgsConstructor
public class EventStatus extends WSSegment {
    private Block block;
    private String caseId;
    private String eventType;
    private String observationDateTime;
    private Slide slide;
    private Specimen specimen;
    private Technician technician;

    public static EventStatus FromMessage(Message message, String eventType, org.example.domain.message.entity.Specimen specimen) {
        EventStatus eventStatus = new EventStatus();

        eventStatus.caseId = message.getOrder().getSampleId();
        eventStatus.eventType = eventType;
        eventStatus.observationDateTime = message.getRegisterTime();
        eventStatus.specimen = Specimen.Default(specimen);
        eventStatus.technician = Technician.Default(message.getOrder().getTechnician());

        return eventStatus;
    }

    public static EventStatus FromMessage(Message message, String eventType, org.example.domain.message.entity.Block block) {
        EventStatus eventStatus = new EventStatus();
        org.example.domain.message.entity.Specimen specimen = block.getSpecimenParent(message);

        eventStatus.block = Block.Default(block, specimen);
        eventStatus.caseId = message.getOrder().getSampleId();
        eventStatus.eventType = eventType;
        eventStatus.observationDateTime = message.getRegisterTime();
        eventStatus.specimen = Specimen.Default(specimen);
        eventStatus.technician = Technician.Default(message.getOrder().getTechnician());

        return eventStatus;
    }

    public static EventStatus FromMessage(Message message, String eventType, org.example.domain.message.entity.Slide slide) {
        EventStatus eventStatus = new EventStatus();
        org.example.domain.message.entity.Block block = slide.getBlockParent(message);
        org.example.domain.message.entity.Specimen specimen = block.getSpecimenParent(message);

        eventStatus.block = Block.Default(block, specimen);
        eventStatus.caseId = message.getOrder().getSampleId();
        eventStatus.eventType = eventType;
        eventStatus.observationDateTime = message.getRegisterTime();
        eventStatus.slide = Slide.Default(slide);
        eventStatus.specimen = Specimen.Default(specimen);
        eventStatus.technician = Technician.Default(message.getOrder().getTechnician());

        return eventStatus;
    }

    public String toString(int indentationLevel) {
        String eventStatus = addIndentation(indentationLevel) + "<eventStatus>\n";

        indentationLevel ++;

        eventStatus += block.toString(indentationLevel) + "\n" +
                addIndentation(indentationLevel) + "<CaseId>" + caseId + "</CaseId>\n" +
                addIndentation(indentationLevel) + "<EventType>" + eventType + "</EventType>\n" +
                addIndentation(indentationLevel) + "<ObservationDateTime>" + observationDateTime + "</ObservationDateTime>\n" +
                slide.toString(indentationLevel) + "\n" +
                specimen.toString(indentationLevel) + "\n" +
                technician.toString(indentationLevel) + "\n";

        indentationLevel --;

        eventStatus += addIndentation(indentationLevel) + "</eventStatus>";
        return eventStatus;
    }
}

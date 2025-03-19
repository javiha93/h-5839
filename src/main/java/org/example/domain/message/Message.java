package org.example.domain.message;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.aplication.hapier.Hapier;
import org.example.domain.mapper.EMap;
import org.example.domain.message.conditions.EStatus;
import org.example.domain.message.entity.Block;
import org.example.domain.message.entity.Order;
import org.example.domain.message.entity.Slide;
import org.example.domain.message.entity.Specimen;
import org.example.domain.message.entity.list.BlocksList;
import org.example.domain.message.entity.list.SpecimensList;
import org.example.domain.message.professional.Physician;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
public class Message extends Reflection implements Cloneable {

    String channelType;
    LocalDateTime registerTime;
    MessageHeader header;
    Patient patient;
    Physician physician;
    String actionCode;
    String error;

    public Message() {
        this.header = new MessageHeader();
        this.patient = new Patient();
        this.physician = new Physician();
    }

    public static Message Default(String messageType, String sampleId) {
        Message message = new Message();

        message.setHeader(MessageHeader.Default(messageType));
        message.setPatient(Patient.Default(sampleId));
        message.setPhysician(Physician.Default());

        return message;
    }

    public static Message Default(String sampleId) {
        Message message = new Message();

        message.setHeader(MessageHeader.Default());
        message.setPatient(Patient.Default(sampleId));
        message.setPhysician(Physician.Default());

        return message;
    }

    public void setRegisterTime(String registerTime) {
        if ((registerTime == null) || (registerTime.isEmpty())){
            return;
        }
        DateTimeFormatter formatter;
        if (registerTime.getBytes().length == 14) {
            formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        } else if (registerTime.getBytes().length == 8) {
            formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        } else {
            return;
        }
        this.registerTime = LocalDateTime.parse(registerTime, formatter);
    }

    public String getRegisterTime() {
        if (registerTime == null){
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return registerTime.format(formatter);
    }

    public List<Slide> getAllSlides() {
        return patient.getAllSlides();
    }

    public Slide getSlide(String id) {
        return getPatient().getSlide(id);
    }

    public List<Block> getAllBlocks() {
        return patient.getAllBlocks();
    }
    public Block getBlock() {
        return patient.getBlock();
    }

    public List<Specimen> getAllSpecimens() {
        return patient.getAllSpecimens();
    }

    public List<Order> getAllOrders() {
        return patient.getAllOrders();
    }

    public Specimen getSpecimen() {return patient.getSpecimen();}

    public Specimen getSpecimen(String id) {return patient.getSpecimen(id);}

    public Order getOrder() { return patient.getOrder(); }
    public Order getOrder(String caseId) { return patient.getOrder(caseId); }


    public String to(EMap map) {
        Hapier hapier = new Hapier();
        return hapier.to(map, this);
    }

    public String to(EMap map, EStatus status) {
        Hapier hapier = new Hapier();
        return hapier.to(map, status, this);
    }

    public String to(EMap map, EStatus status, Order order) {
        Hapier hapier = new Hapier();
        Message messageCloned = this.clone();
        Order orderCloned = order.clone();

        orderCloned.setSpecimens(new SpecimensList());
        messageCloned.getPatient().setOrder(orderCloned);

        return hapier.to(map,status, messageCloned);
    }

    public String to(EMap map, Order order) {
        Hapier hapier = new Hapier();
        Message messageCloned = this.clone();
        Order orderCloned = order.clone();

        orderCloned.setSpecimens(new SpecimensList());
        messageCloned.getPatient().setOrder(orderCloned);

        return hapier.to(map, messageCloned);
    }

    public String to(EMap map, Specimen specimen) {
        Hapier hapier = new Hapier();
        Message messageCloned = this.clone();
        Specimen specimenCloned = specimen.clone();

        specimenCloned.setBlocks(new BlocksList());
        messageCloned.getPatient().setSpecimen(specimenCloned);

        return hapier.to(map, messageCloned);
    }

    public String to(EMap map, Slide slide) {
        Hapier hapier = new Hapier();
        Message messageCloned = this.clone();
        messageCloned.getPatient().setSlide(slide);
        return hapier.to(map, messageCloned);
    }

    @Override
    public Message clone() {
        try {
            Message cloned = (Message) super.clone();
            if (this.header != null) {
                cloned.setHeader(this.header.clone());
            } else {
                cloned.setHeader(null);
            }
            if (this.patient != null) {
                cloned.setPatient(this.patient.clone());
            } else {
                cloned.setPatient(null);
            }
            if (this.physician != null) {
                cloned.setPhysician(this.physician.clone());
            } else {
                cloned.setPhysician(null);
            }
            return cloned;
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Cloning not supported for Specimen", e);
        }
    }

}

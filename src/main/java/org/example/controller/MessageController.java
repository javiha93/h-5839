
package org.example.controller;

import org.example.domain.message.Message;
import org.example.domain.message.entity.Slide;
import org.example.domain.message.entity.Specimen;
import org.example.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Message> generateMessage(@RequestBody SampleIdRequest request) {
        String sampleId = (request != null && request.getSampleId() != null) ? request.getSampleId() : "";
        Message message = messageService.generateMessage(sampleId);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/convert-specimen")
    public ResponseEntity<String> convertMessageOneSpecimen(@RequestBody SpecimenRequest request) {
        String convertedMessage = messageService.convertMessage(request.getMessage(), request.getMessageType(), request.getSpecimen());
        return ResponseEntity.ok(convertedMessage);
    }

    @PostMapping("/convert-slide")
    public ResponseEntity<String> convertMessageOneSlide(@RequestBody SlideRequest request) {
        String convertedMessage = messageService.convertMessage(request.getMessage(), request.getMessageType(), request.getSlide());
        return ResponseEntity.ok(convertedMessage);
    }

    @PostMapping("/convert-status")
    public ResponseEntity<String> convertMessageStatus(@RequestBody StatusRequest request) {
        String convertedMessage = messageService.convertMessage(request.getMessage(), request.getMessageType(), request.getStatus());
        return ResponseEntity.ok(convertedMessage);
    }

    @PostMapping("/convert-status-slide")
    public ResponseEntity<String> convertMessageStatusSlide(@RequestBody StatusSlideRequest request) {
        String convertedMessage = messageService.convertMessage(request.getMessage(), request.getMessageType(), request.getSlide(), request.getStatus());
        return ResponseEntity.ok(convertedMessage);
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convertMessage(@RequestBody ConvertRequest request) {
        String convertedMessage = messageService.convertMessage(request.getMessage(), request.getMessageType());
        return ResponseEntity.ok(convertedMessage);
    }

    public static class SampleIdRequest {
        private String sampleId;

        public String getSampleId() {
            return sampleId;
        }

        public void setSampleId(String sampleId) {
            this.sampleId = sampleId;
        }
    }

    public static class ConvertRequest {
        private Message message;
        private String messageType;

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }

        public String getMessageType() {
            return messageType;
        }

        public void setMessageType(String messageType) {
            this.messageType = messageType;
        }
    }

    public static class SpecimenRequest {
        private Message message;
        private String messageType;

        private Specimen specimen;

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }

        public String getMessageType() {
            return messageType;
        }

        public void setMessageType(String messageType) {
            this.messageType = messageType;
        }

        public Specimen getSpecimen() {
            return specimen;
        }

        public void setSpecimen(Specimen specimen) {
            this.specimen = specimen;
        }
    }

    public static class SlideRequest {
        private Message message;
        private String messageType;
        private Slide slide;

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }

        public String getMessageType() {
            return messageType;
        }

        public void setMessageType(String messageType) {
            this.messageType = messageType;
        }

        public Slide getSlide() {
            return slide;
        }

        public void setSlide(Slide slide) {
            this.slide = slide;
        }
    }

    public static class StatusRequest {
        private Message message;

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }

        public String getMessageType() {
            return messageType;
        }

        public void setMessageType(String messageType) {
            this.messageType = messageType;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        private String messageType;

        private String status;

    }

    public static class StatusSlideRequest {
        private Message message;
        private String messageType;
        private Slide slide;
        private String status;

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }

        public String getMessageType() {
            return messageType;
        }

        public void setMessageType(String messageType) {
            this.messageType = messageType;
        }

        public Slide getSlide() {
            return slide;
        }

        public void setSlide(Slide slide) {
            this.slide = slide;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}

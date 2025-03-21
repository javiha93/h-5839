
package org.example.controller;

import org.example.domain.message.Message;
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
        Message message = messageService.generateMessage(request.getSampleId());
        return ResponseEntity.ok(message);
    }

    @PostMapping("/oml21")
    public ResponseEntity<String> generateOML21Message(@RequestBody Message message) {
        String oml21Message = messageService.generateOML21Message(message);
        return ResponseEntity.ok(oml21Message);
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convertMessage(@RequestBody ConvertRequest request) {
        String convertedMessage = messageService.convertMessage(request.getMessage(), request.getMessageType());
        return ResponseEntity.ok(convertedMessage);
    }
    
    @PostMapping("/oewf")
    public ResponseEntity<String> generateOEWFMessage(@RequestBody Message message) {
        String oewfMessage = messageService.generateOEWFMessage(message);
        return ResponseEntity.ok(oewfMessage);
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
}

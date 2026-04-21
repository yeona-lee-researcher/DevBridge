package com.DevBridge.devbridge.controller;

import com.DevBridge.devbridge.dto.AiChatRequest;
import com.DevBridge.devbridge.dto.AiChatResponse;
import com.DevBridge.devbridge.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final GeminiService geminiService;

    @PostMapping("/chat")
    public ResponseEntity<AiChatResponse> chat(@RequestBody AiChatRequest request) {
        try {
            String reply = geminiService.chat(request);
            return ResponseEntity.ok(AiChatResponse.builder().reply(reply).build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    AiChatResponse.builder().error(e.getMessage()).build()
            );
        }
    }
}

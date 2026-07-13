package com.visualizer.SearchSpace.controller;

import com.visualizer.SearchSpace.dto.AlgorithmRequest;
import com.visualizer.SearchSpace.dto.AlgorithmResponse;
import com.visualizer.SearchSpace.service.AlgorithmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/algorithms")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from local React dev server
public class AlgorithmController {

    @Autowired
    private AlgorithmService algorithmService;

    @PostMapping("/binary-search")
    public ResponseEntity<AlgorithmResponse> runBinarySearch(@RequestBody AlgorithmRequest request) {
        if (request.getTarget() == null) {
            return ResponseEntity.badRequest().build();
        }
        AlgorithmResponse response = algorithmService.binarySearch(request.getArray(), request.getTarget());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cycle-sort")
    public ResponseEntity<AlgorithmResponse> runCycleSort(@RequestBody AlgorithmRequest request) {
        AlgorithmResponse response = algorithmService.cycleSort(request.getArray());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/bit-manipulation")
    public ResponseEntity<AlgorithmResponse> runBitManipulation(@RequestBody AlgorithmRequest request) {
        AlgorithmResponse response = algorithmService.bitManipulation(request.getArray());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/array-manipulation")
    public ResponseEntity<AlgorithmResponse> runArrayManipulation(@RequestBody AlgorithmRequest request) {
        AlgorithmResponse response = algorithmService.arrayManipulation(request.getArray());
        return ResponseEntity.ok(response);
    }
}

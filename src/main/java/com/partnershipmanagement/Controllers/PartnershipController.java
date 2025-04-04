package com.partnershipmanagement.Controllers;

import com.partnershipmanagement.Entities.Partnership;
import com.partnershipmanagement.Repositories.PartnershipRepository;
import com.partnershipmanagement.Services.PartnershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partnerships")
public class PartnershipController {

    @Autowired
    private PartnershipRepository partnershipRepository;
    @Autowired
    private PartnershipService partnershipService;

    @GetMapping("/all")
    public List<Partnership> getAllPartnerships() {
        return partnershipRepository.findAll();
    }

    @PostMapping("/applyForPartnership")
    public Partnership applyForPartnership(@RequestParam int entrepriseId, @RequestParam int proposalId) {
        return partnershipService.applyForPartnership(entrepriseId, proposalId);
    }
    @PostMapping("/accept/{partnershipId}/{entrepriseId}")
    public String acceptPartnership(@PathVariable int partnershipId, @PathVariable int entrepriseId) {
        partnershipService.acceptPartnership(partnershipId, entrepriseId);
        return "Partnership accepted successfully.";
    }

}
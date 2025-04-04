package com.partnershipmanagement.Controllers;

import com.partnershipmanagement.Entities.Proposal;
import com.partnershipmanagement.Services.ProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("proposal")
@RestController
public class ProposalController {
    @Autowired
    private final ProposalService proposalService;

    // Create a proposal
    @PostMapping("/createProposal")
    public Proposal createProposal(@RequestBody Proposal proposal) {
        return proposalService.createProposal(proposal);
    }

    // Get all proposals
    @GetMapping("/getAllProposals")
    public List<Proposal> getAllProposals() {
        return proposalService.getAllProposals();
    }

    // Get proposal by ID
    @GetMapping("/getProposalById/{id}")
    public Proposal getProposalById(@PathVariable int id) {
        return proposalService.getProposalById(id);
    }

    // Update proposal
    @PutMapping("editProposal/{id}")
    public Proposal updateProposal(@PathVariable int id, @RequestBody Proposal updatedProposal) {
        return proposalService.updateProposal(id, updatedProposal);
    }

    // Delete proposal
    @DeleteMapping("/deleteProposal/{id}")
    public void deleteProposal(@PathVariable int id) {
        proposalService.deleteProposal(id);
    }
}

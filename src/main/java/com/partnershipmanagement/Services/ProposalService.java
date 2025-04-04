package com.partnershipmanagement.Services;

import com.partnershipmanagement.Entities.Proposal;
import com.partnershipmanagement.Repositories.ProposalRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ProposalService {
    @Autowired
    private ProposalRepository proposalRepository;

    public Proposal createProposal(Proposal proposal) {
        return proposalRepository.save(proposal);
    }

    // Get all proposals
    public List<Proposal> getAllProposals() {
        return proposalRepository.findAll();
    }

    // Get a proposal by ID
    public Proposal getProposalById(int id) {
        return proposalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Proposal not found with id " + id));
    }

    // Update an existing proposal
    public Proposal updateProposal(int id, Proposal updatedProposal) {
        return proposalRepository.findById(id)
                .map(proposal -> {
                    proposal.setProposalName(updatedProposal.getProposalName());
                    proposal.setProposalDescription(updatedProposal.getProposalDescription());
                    proposal.setStartDate(updatedProposal.getStartDate());
                    proposal.setEndDate(updatedProposal.getEndDate());
                    proposal.setPlannedAmount(updatedProposal.getPlannedAmount());
                    proposal.setProposalStatus(updatedProposal.getProposalStatus());
                    proposal.setProposalType(updatedProposal.getProposalType());
                    return proposalRepository.save(proposal);
                })
                .orElseThrow(() -> new EntityNotFoundException("Proposal not found with id " + id));
    }

    // Delete a proposal
    public void deleteProposal(int id) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Proposal not found with id " + id));
        proposalRepository.delete(proposal);
    }
}

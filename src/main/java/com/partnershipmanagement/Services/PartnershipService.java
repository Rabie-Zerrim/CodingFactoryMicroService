package com.partnershipmanagement.Services;

import com.partnershipmanagement.Entities.Entreprise;
import com.partnershipmanagement.Entities.Partnership;
import com.partnershipmanagement.Entities.PartnershipStatus;
import com.partnershipmanagement.Entities.Proposal;
import com.partnershipmanagement.Repositories.EntrepriseRepository;
import com.partnershipmanagement.Repositories.PartnershipRepository;
import com.partnershipmanagement.Repositories.ProposalRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class PartnershipService {

   @Autowired
   private EntrepriseRepository entrepriseRepository;
   @Autowired
   private ProposalRepository proposalRepository;
   @Autowired
   private PartnershipRepository partnershipRepository;

   public Partnership applyForPartnership(int entrepriseId, int proposalId) {
      Entreprise entreprise = entrepriseRepository.findById(entrepriseId)
              .orElseThrow(() -> new EntityNotFoundException("Entreprise not found with id " + entrepriseId));

      Proposal proposal = proposalRepository.findById(proposalId)
              .orElseThrow(() -> new EntityNotFoundException("Proposal not found with id " + proposalId));

      // ❌ If the proposal is already "FULFILLED", block the application
      if (proposal.getProposalStatus().equals("FULFILLED")) {
         throw new IllegalStateException("This proposal has already been fulfilled. No more applications are allowed.");
      }

      // ✅ Check if any existing partnership for this proposal is already ACCEPTED
      boolean isAccepted = partnershipRepository.existsByProposalIdProposalAndPartnershipStatus(proposalId, PartnershipStatus.approved);

      if (isAccepted) {
         // Update proposal status to "FULFILLED" and prevent further applications
         proposal.setProposalStatus("FULFILLED");
         proposalRepository.save(proposal);
         throw new IllegalStateException("A partnership for this proposal has already been accepted. No further applications are allowed.");
      }

      // ✅ Create a new Partnership with status PENDING
      Partnership partnership = new Partnership();
      partnership.setEntreprise(entreprise);
      partnership.setProposal(proposal);
      partnership.setPartnershipStatus(PartnershipStatus.pending);

      return partnershipRepository.save(partnership);
   }

  /* public Partnership applyForPartnership(int entrepriseId, int proposalId) {
      Entreprise entreprise = entrepriseRepository.findById(entrepriseId)
              .orElseThrow(() -> new EntityNotFoundException("Entreprise not found with id " + entrepriseId));

      Proposal proposal = proposalRepository.findById(proposalId)
              .orElseThrow(() -> new EntityNotFoundException("Proposal not found with id " + proposalId));

      Partnership partnership = new Partnership();
      partnership.setEntreprise(entreprise);
      partnership.setProposal(proposal);
      partnership.setPartnershipStatus(PartnershipStatus.pending);

      return partnershipRepository.save(partnership);
   }*/


   @Transactional
   public void acceptPartnership(int partnershipId, int entrepriseId) {
      // Retrieve the partnership by ID
      Partnership partnership = partnershipRepository.findById(partnershipId)
              .orElseThrow(() -> new EntityNotFoundException("Partnership not found"));

      // Check if the enterprise ID matches
      if (partnership.getEntreprise().getIdEntreprise() != entrepriseId) {
         throw new IllegalArgumentException("This partnership does not belong to the given enterprise.");
      }

      // Retrieve the associated proposal
      Proposal proposal = partnership.getProposal();
      if (proposal == null) {
         throw new IllegalStateException("Proposal not found for this partnership.");
      }

      // Accept the selected partnership
      partnership.setPartnershipStatus(PartnershipStatus.approved);

      // Reject all other partnerships for the same proposal
      List<Partnership> otherPartnerships = partnershipRepository.findByProposal(proposal);
      for (Partnership p : otherPartnerships) {
         if (p.getIdPartnership() != partnershipId) {
            p.setPartnershipStatus(PartnershipStatus.rejected);
         }
      }

      // Update the proposal status
      proposal.setProposalStatus("fulfilled");

      // Save changes
      partnershipRepository.saveAll(otherPartnerships);
      partnershipRepository.save(partnership);
      proposalRepository.save(proposal);
   }
}
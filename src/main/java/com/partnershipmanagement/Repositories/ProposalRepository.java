package com.partnershipmanagement.Repositories;

import com.partnershipmanagement.Entities.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalRepository extends JpaRepository<Proposal, Integer> {
}

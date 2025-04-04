package com.partnershipmanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Proposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idProposal;
    String proposalName;
    String proposalDescription;
    Date startDate;
    Date endDate;
    float plannedAmount;
    String proposalStatus;
    String proposalType;

    // @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    // User user;

    // One-to-many relationship: One Proposal can have many Applications
    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Partnership> applications;

}

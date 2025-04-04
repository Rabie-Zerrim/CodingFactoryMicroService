package com.partnershipmanagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter

@FieldDefaults(level = AccessLevel.PRIVATE)
public class Partnership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idPartnership;
    @Enumerated(EnumType.STRING)
    PartnershipStatus partnershipStatus;


    @ManyToOne
    Entreprise entreprise;

    // Many-to-one relationship: Many applications can be related to one proposal
    @ManyToOne
    @JoinColumn(name = "proposal_id",referencedColumnName = "idProposal")
    @JsonIgnore
    private Proposal proposal;
}

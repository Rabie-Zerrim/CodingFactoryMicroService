package com.partnershipmanagement.Services;

import com.partnershipmanagement.Entities.Entreprise;
import com.partnershipmanagement.Repositories.EntrepriseRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class EntrepriseService implements IEntrepriseService {
    @Autowired
    EntrepriseRepository entrepriseRepo;

    @Override
    public Entreprise createEntreprise(Entreprise ent) {
        return entrepriseRepo.save(ent);
    }

    @Override
    public void removeEntreprise(int id) {
        entrepriseRepo.deleteById(id);
        System.out.println("Entreprise with id " + id + " removed");
    }

    @Override
    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepo.findAll();
    }

    public Entreprise updateEntreprise(int id, Entreprise updatedEntreprise) {
        return entrepriseRepo.findById(id)
                .map(entreprise -> {
                    entreprise.setNameEntreprise(updatedEntreprise.getNameEntreprise());
                    entreprise.setAddressEntreprise(updatedEntreprise.getAddressEntreprise());
                    entreprise.setEmailEntreprise(updatedEntreprise.getEmailEntreprise());
                    entreprise.setPhoneEntreprise(updatedEntreprise.getPhoneEntreprise());
                    entreprise.setDescriptionEntreprise(updatedEntreprise.getDescriptionEntreprise());
                    return entrepriseRepo.save(entreprise);
                })
                .orElseThrow(() -> new EntityNotFoundException("Entreprise not found with id " + id));
    }






    // @Override
    public void removeAllEntreprises() {
        entrepriseRepo.deleteAll();
    }
}

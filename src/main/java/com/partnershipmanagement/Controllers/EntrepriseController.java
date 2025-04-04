package com.partnershipmanagement.Controllers;

import com.partnershipmanagement.Entities.Entreprise;
import com.partnershipmanagement.Repositories.EntrepriseRepository;
import com.partnershipmanagement.Services.EntrepriseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("entreprise")
@RestController
public class EntrepriseController {
    @Autowired
    private EntrepriseService entrepriseService;

    private String hello="Hello, i'm the Job MS";

    @RequestMapping("/helloJ")
    public String sayHello(){
        return hello;
    }

    @PostMapping("/add")
    public Entreprise createEntreprise(@RequestBody Entreprise ent) {
        Entreprise newEntreprise = entrepriseService.createEntreprise(ent);
        return newEntreprise;
    }

    @GetMapping("/getListEntreprise")
    public List<Entreprise> getAllEntreprises() {
        return entrepriseService.getAllEntreprises();
    }

    @DeleteMapping("/deleteEntreprise/{id}")
    public Void removeEntreprise(@PathVariable int id) {
        entrepriseService.removeEntreprise(id);
        return null;
    }

    @PutMapping("/editEntreprise/{id}")
    public Entreprise updateEntreprise(@PathVariable int id, @RequestBody Entreprise updatedEntreprise) {
        return entrepriseService.updateEntreprise(id, updatedEntreprise);
    }
}

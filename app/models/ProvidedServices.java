package models;

import io.ebean.Model;

import javax.persistence.Entity;
import java.time.Duration;
import java.util.Currency;
import java.util.UUID;

@Entity
public class ProvidedServices extends Model {
    private UUID id;
    private UUID providedBy ;
    private String name;
    private Duration duration;
    private int priceInCents;
    private Currency currency;
}

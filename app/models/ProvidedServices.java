package models;

import io.ebean.Model;
import org.checkerframework.checker.interning.qual.InternedDistinct;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.Duration;
import java.util.Currency;
import java.util.UUID;

@Entity
public class ProvidedServices extends Model {
    @Id
    private UUID id;
    private UUID providedBy ;
    private String name;
    private Duration duration;
    private int priceInCents;
    private Currency currency;
}

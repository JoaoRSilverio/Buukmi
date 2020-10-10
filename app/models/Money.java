package models;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.propertyeditors.CurrencyEditor;
import org.apache.commons.lang3.builder.CompareToBuilder;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.util.Currency;

public class Money implements Comparable<Money>, Serializable {
    private static final Log logger = LogFactory.getLog(Money.class);
    private static final int[] cents = {1, 10, 100, 1000};
    private String m_myObjectName = "money";
    private long m_amount;
    private Currency m_currency;

    private static NumberFormat getFormatter(Currency currency){
        NumberFormat formatter = NumberFormat.getInstance();
        if (formatter instanceof DecimalFormat) {
            DecimalFormat decimalFormatter = (DecimalFormat) formatter;
            decimalFormatter.applyPattern("#,##0.00 \u00A4\u00A4");

            decimalFormatter.setCurrency(currency);
            DecimalFormatSymbols symbols = decimalFormatter.getDecimalFormatSymbols();
            symbols.setInternationalCurrencySymbol(currency.getCurrencyCode());
            symbols.setCurrencySymbol(currency.getSymbol());
            decimalFormatter.setDecimalFormatSymbols(symbols);
        }
        formatter.setMinimumFractionDigits(currency.getDefaultFractionDigits());
        formatter.setMaximumFractionDigits(currency.getDefaultFractionDigits());
        return formatter;
    }
    private Money(){

    }
    private int centFactor() {
        return cents[m_currency.getDefaultFractionDigits()];
    }
    // throws Illegal Argument
    private void assertSameCurrencyAs(Money money){
        if(money == null){
            throw new IllegalArgumentException("Cannot compare money to null");
        }
        if(!m_currency.equals(money.getCurrency())){
            throw new IllegalArgumentException("Cannot compare diferent currencies");
        }
    }
    public Money(BigDecimal amount, Currency currency, RoundingMode roundingMode){
        m_currency = currency;
        amount = amount.movePointRight(currency.getDefaultFractionDigits());
        amount = amount.setScale(0, roundingMode);
        m_amount = amount.longValue();
    }
    //  Money( 1.48, Currency.getInstance("USD") )
    public Money(double amount, Currency currency) {
        m_currency = currency;
        m_amount = Math.round(amount * centFactor());
    }

    // Money( 12, Currency.getInstance("CAD") )
    public Money(long amount, Currency currency){
        m_currency = currency;
        m_amount = amount * centFactor();
    }
    public Currency getCurrency() {
        return m_currency;
    }

    public Money add(Money other){
        assertSameCurrencyAs(other);
        return newMoney(m_amount + other.m_amount);
    }
    public Money[] allocate(int n){
        Money lowResult = newMoney(m_amount / n);
        Money highResult = newMoney(lowResult.m_amount + 1);
        Money[] results = new Money[n];
        int remainder = (int) m_amount % n;
        for (int i = 0; i < remainder; i++) {
            results[i] = highResult;
        }
        for (int i = remainder; i < n; i++) {
            results[i] = lowResult;
        }
        return results;
    }

    public Money[] allocate(long[] ratios) {
        long total = 0;
        for (int i = 0; i < ratios.length; i++) {
            total += ratios[i];
        }
        long remainder = m_amount;
        Money results[] = new Money[ratios.length];
        for (int i = 0; i < results.length; i++) {
            results[i] = newMoney(m_amount * ratios[i] / total);
            remainder -= results[i].m_amount;
        }
        for (int i = 0; i < remainder; i++) {
            results[i].m_amount++;
        }
        return results;
    }




    public BigDecimal getAmount() {
        logger.debug("m_amount() = " + m_amount);
        return BigDecimal.valueOf(m_amount, m_currency.getDefaultFractionDigits());
    }

    public boolean equals(Object otherMoney){
        if(this == otherMoney) return true;
        if(!(otherMoney instanceof Money)) return false;
        Money castOther = (Money) otherMoney;
        return new EqualsBuilder().append(m_amount, castOther.m_amount).append(m_currency, castOther.m_currency).isEquals();
    }

    public boolean greaterThan(Money other){
        return compareTo(other) > 0;
    }
    public boolean lessThan(Money other){
        return compareTo(other)< 0;
    }
    public int hashCode(){
        return new HashCodeBuilder().append(m_amount).append(m_currency).toHashCode();
    }

    public Money multiply(BigDecimal amount){
        return multiply(amount, RoundingMode.HALF_EVEN);
    }

    private Money multiply(BigDecimal amount, RoundingMode roundingMode){
        return new Money(getAmount().multiply(amount), m_currency, roundingMode);
    }

    public Money multiply(double amount){
        return multiply(new BigDecimal(amount));
    }

     public int compareTo(Money otherMoney) {
        assertSameCurrencyAs(otherMoney);
        return new CompareToBuilder().append(m_amount, otherMoney.m_amount).toComparison();
     }

    private Money newMoney(long amount) {
        return new Money(amount, m_currency);
    }

    public Money subtract(Money otherMoney) {
        assertSameCurrencyAs(otherMoney);
        return newMoney(m_amount - otherMoney.m_amount);
    }






}

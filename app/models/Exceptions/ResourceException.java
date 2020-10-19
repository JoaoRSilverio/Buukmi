package models.Exceptions;

public class ResourceException extends Exception{
    public Long id;
    public ResourceException(final String msg){
        super(msg);
    }
    public ResourceException(final String msg, Long id){
        super(msg);
        this.id = id;
        }
    public ResourceException(final String msg, final Throwable throwable, Long id){
        super(msg, throwable);
        this.id = id;
    }
    public ResourceException(final Throwable throwable, Long id) {
        super(throwable);
        this.id = id;
    }
}

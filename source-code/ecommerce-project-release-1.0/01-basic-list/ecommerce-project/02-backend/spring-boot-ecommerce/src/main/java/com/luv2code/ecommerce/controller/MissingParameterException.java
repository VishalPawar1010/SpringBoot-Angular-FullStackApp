package com.luv2code.ecommerce.controller;

public class MissingParameterException extends Exception{
    public MissingParameterException() {
        super();
    }

    public MissingParameterException(String message) {
        super(message);
    }
}
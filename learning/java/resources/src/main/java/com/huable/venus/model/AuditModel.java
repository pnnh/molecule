package com.huable.venus.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
// @JsonIgnoreProperties(value = { "createdTime", "updatedTime" }, allowGetters
// = true)
@Data
@Getter
@Setter
@ToString
public abstract class AuditModel implements Serializable {
    // @Temporal(TemporalType.TIMESTAMP)
    // @Column(name = "create_time", nullable = false, updatable = false)
    // @CreatedDate
    // @JsonProperty("create_time")
    // private Date createTime;

    // @Temporal(TemporalType.TIMESTAMP)
    // @Column(name = "update_time", nullable = false)
    // @LastModifiedDate
    // @JsonProperty("update_time")
    // private Date updatedTime;

}
package com.huable.venus.model;

import lombok.*;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "pictures")
@Data
@EqualsAndHashCode(callSuper = false)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PictureModel extends AuditModel {
    @Id
    @Column(name = "pk")
    private String pk;

    @NotBlank
    @Size(min = 3, max = 100)
    @Column(columnDefinition = "title")
    private String title;

    @Column(columnDefinition = "description")
    private String description;

    @Column(columnDefinition = "file")
    private String file;

    @Column(columnDefinition = "status")
    private int status;

    @Column(columnDefinition = "creator")
    private String creator;

    @Column(columnDefinition = "folder")
    private String folder;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time", nullable = false, updatable = false)
    @CreatedDate
    @JsonProperty("create_time")
    private Date createTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_time", nullable = false)
    @LastModifiedDate
    @JsonProperty("update_time")
    private Date updatedTime;
}
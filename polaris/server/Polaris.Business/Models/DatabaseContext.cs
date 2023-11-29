namespace Polaris.Business.Models;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

public class DatabaseContext : DbContext
{
    public DbSet<ArticleModel> Articles => Set<ArticleModel>(); 
    public DbSet<AccountModel> Accounts => Set<AccountModel>();
    public DbSet<CredentialTable> Credentials => Set<CredentialTable>();
    public DbSet<SessionTable> Sessions => Set<SessionTable>();
    public DbSet<CategoryModel> Categories => Set<CategoryModel>();
    public DbSet<GroupModel> Groups => Set<GroupModel>();
    public DbSet<TagModel> Tags => Set<TagModel>();
    public DbSet<CommentModel> Comments => Set<CommentModel>();
    public DbSet<RelationModel> Relations => Set<RelationModel>();
    public DbSet<ChannelModel> Channels => Set<ChannelModel>();
    public DbSet<ViewerModel> Viewers => Set<ViewerModel>();

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

    }
}

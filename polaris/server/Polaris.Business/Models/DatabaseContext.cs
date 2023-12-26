namespace Polaris.Business.Models;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

public class DatabaseContext : DbContext
{
    public DbSet<PageModel> Pages => Set<PageModel>();
    public DbSet<AccountModel> Accounts => Set<AccountModel>();
    public DbSet<CredentialTable> Credentials => Set<CredentialTable>();
    public DbSet<SessionTable> Sessions => Set<SessionTable>();
    public DbSet<CategoryModel> Categories => Set<CategoryModel>();
    public DbSet<PartitionModel> Partitions => Set<PartitionModel>();
    public DbSet<TagModel> Tags => Set<TagModel>();
    public DbSet<CommentModel> Comments => Set<CommentModel>();
    public DbSet<RelationModel> Relations => Set<RelationModel>();
    public DbSet<ChannelModel> Channels => Set<ChannelModel>();
    public DbSet<ViewerModel> Viewers => Set<ViewerModel>();
    public DbSet<ProfileModel> Profiles => Set<ProfileModel>();

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

    }
}

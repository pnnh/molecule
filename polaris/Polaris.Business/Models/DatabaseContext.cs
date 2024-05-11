using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Polaris.Business.Models.Polaris;
using Polaris.Business.Models.Venus;

namespace Polaris.Business.Models;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<PSArticleModel> Pages => Set<PSArticleModel>();
    public DbSet<PSAccountModel> Accounts => Set<PSAccountModel>();
    public DbSet<CredentialTable> Credentials => Set<CredentialTable>();
    public DbSet<PartitionModel> Partitions => Set<PartitionModel>();
    public DbSet<TagModel> Tags => Set<TagModel>();
    public DbSet<CommentModel> Comments => Set<CommentModel>();
    public DbSet<RelationModel> Relations => Set<RelationModel>();
    public DbSet<PSChannelModel> Channels => Set<PSChannelModel>();
    public DbSet<NSChannelModel> NSChannels => Set<NSChannelModel>();
    public DbSet<ViewerModel> Viewers => Set<ViewerModel>();
    public DbSet<NSPictureModel> Pictures => Set<NSPictureModel>();

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        base.ConfigureConventions(configurationBuilder);
        configurationBuilder
            .Properties<DateTime>()
            .HaveConversion<DateTimeConverter>();
    }
}


public class DateTimeConverter() : ValueConverter<DateTime, DateTime>(v => ConvertTo(v), v => ConvertFrom(v))
{
    private static DateTime ConvertTo(DateTime v)
    {
        var newValue = v.ToUniversalTime();
        return newValue;
    }

    private static DateTime ConvertFrom(DateTime v)
    {
        var newValue = new DateTime(v.Ticks, DateTimeKind.Utc);
        return newValue;
    }
}
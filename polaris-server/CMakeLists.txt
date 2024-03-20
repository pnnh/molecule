

add_library(Molecule SHARED 
    Molecule/Helpers/DateTimeHelper.cs
    Molecule/Helpers/EnumHelper.cs
    Molecule/Helpers/FormHelper.cs
    Molecule/Helpers/HttpHelper.cs)


set_target_properties(Molecule PROPERTIES
    DOTNET_SDK "Microsoft.NET.Sdk"
    DOTNET_TARGET_FRAMEWORK "net8.0"
    VS_GLOBAL_ImplicitUsings "enable"
    VS_GLOBAL_Nullable "enable"
    VS_GLOBAL_NullableReferenceTypes "true"
    VS_GLOBAL_TreatWarningsAsErrors "true")

LIST(APPEND VS_PACKAGE_REFERENCES "SimpleBase_4.0.0")
LIST(APPEND VS_PACKAGE_REFERENCES "Microsoft.Extensions.Logging.Log4Net.AspNetCore_6.1.0")
LIST(APPEND VS_PACKAGE_REFERENCES "Microsoft.AspNetCore.OpenApi_8.0.1")
LIST(APPEND VS_PACKAGE_REFERENCES "Microsoft.AspNetCore.Authentication.JwtBearer_8.0.1")
set_property(TARGET Molecule PROPERTY VS_PACKAGE_REFERENCES ${VS_PACKAGE_REFERENCES})

# LIST(APPEND VS_DOTNET_REFERENCES "System")
# LIST(APPEND VS_DOTNET_REFERENCES "System.Runtime")
# LIST(APPEND VS_DOTNET_REFERENCES "System.ComponentModel.TypeConverter")
# LIST(APPEND VS_DOTNET_REFERENCES "Microsoft.AspNetCore.Mvc.Core")
# LIST(APPEND VS_DOTNET_REFERENCES "Microsoft.AspNetCore.App")

# set_property(TARGET Molecule PROPERTY VS_DOTNET_REFERENCES ${VS_DOTNET_REFERENCES})

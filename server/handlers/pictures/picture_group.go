package pictures

// // This file will be automatically regenerated based on the schema, any resolver implementations
// // will be copied through when generating and any unknown code will be moved to the end.

// import (
// 	"context"
// 	"fmt"
// 	"quantum/graph/generated"
// 	"quantum/server/models"
// )

// // PicturesGroups is the resolver for the pictures_groups field.
// func (r *queryResolver) PicturesGroups(ctx context.Context) (*models.PicturesGroupsQueryResult, error) {
// 	sqlCountText := `select count(*) from pictures_groups;`
// 	var listCount int
// 	if err := r.serverMiddleware.SqlxService.QueryRow(sqlCountText).Scan(&listCount); err != nil {
// 		return nil, fmt.Errorf("查询表情总数出错: %w", err)
// 	}
// 	sqlText := `select pg.pk, pg.create_time, pg.update_time, pg.title, pg.creator, pg.description, pg.count, pg.order_number
// 	from pictures_groups pg;`
// 	var sqlResults []models.PictureGroupTable

// 	if err := r.serverMiddleware.SqlxService.Select(&sqlResults, sqlText); err != nil {
// 		return nil, fmt.Errorf("查询表情总数出错2: %w", err)
// 	}

// 	groups := make([]*models.PictureGroupView, 0)
// 	for _, v := range sqlResults {
// 		vm := &models.PictureGroupView{
// 			Pk:    v.Pk,
// 			Title: v.Title,
// 		}
// 		groups = append(groups, vm)
// 	}

// 	result := &models.PicturesGroupsQueryResult{
// 		List:  groups,
// 		Count: 0,
// 	}
// 	return result, nil
// }
